                        <Avatar
                            rounded
                            title="amazon"
                            value="amazon"
                            disabled={false}
                            raised
                            containerStyle={styles.logoContainer}
                            size="large"
                            activeOpacity={0.2}
                            overlayContainerStyle=""
                            onPress={(e) => this.selectService(e)}
                            onEditPress={() => this.selectService()}
                            source={require('../assets/images/amazon.png')}
                            showEditButton
                            editButton={
                                this.state.amazonSelected === true ?
                                {name: 'minus', color: 'red', type: 'font-awesome'}
                                :
                                {name: 'plus', color: 'green', type: 'font-awesome'}
                                }
                            />
                        <Avatar
                            rounded
                            disabled={false}
                            raised
                            containerStyle={styles.logoContainer}
                            size="large"
                            activeOpacity={0.2}
                            onPress={(event) => this.selectService(event)}
                            source={require('../assets/images/disney.png')}
                            showEditButton
                            editButton={
                                this.state.disneySelected === true ?
                                {name: 'minus', color: 'red', type: 'font-awesome'}
                                :
                                {name: 'plus', color: 'green', type: 'font-awesome'}
                                }
                            />
                        <Avatar
                            rounded
                            disabled={false}
                            raised
                            containerStyle={styles.logoContainer}
                            size="large"
                            activeOpacity={0.2}
                            onPress={() => console.log('Pressed')}
                            source={require('../assets/images/fx.png')}
                            showEditButton
                            editButton={{name: 'plus', color: 'green', type: 'font-awesome'}}
                            />
                    </View>
                    <View style={styles.rowContainer}>
                    <Avatar
                        rounded
                        disabled={false}
                        raised
                        containerStyle={styles.logoContainer}
                        size="large"
                        activeOpacity={0.2}
                        onPress={() => console.log('Pressed')}
                        source={require('../assets/images/hbo.png')}
                        showEditButton
                        editButton={{name: 'plus', color: 'green', type: 'font-awesome'}}
                        />
                    <Avatar
                        rounded
                        disabled={false}
                        raised
                        containerStyle={styles.logoContainer}
                        size="large"
                        activeOpacity={0.2}
                        onPress={() => console.log('Pressed')}
                        source={require('../assets/images/hulu.png')}
                        showEditButton
                        editButton={{name: 'plus', color: 'green', type: 'font-awesome'}}
                        />
                    <Avatar
                        rounded
                        disabled={false}
                        raised
                        containerStyle={styles.logoContainer}
                        size="large"
                        activeOpacity={0.2}
                        onPress={() => console.log('Pressed')}
                        source={require('../assets/images/netflix.png')}
                        showEditButton
                        editButton={{name: 'plus', color: 'green', type: 'font-awesome'}}
                        />
                    </View>
                    <View style={styles.rowContainer}>
                    <Avatar
                        rounded
                        disabled={false}
                        raised
                        containerStyle={styles.logoContainer}
                        size="large"
                        activeOpacity={0.2}
                        onPress={() => console.log('Pressed')}
                        source={require('../assets/images/showtime.png')}
                        showEditButton
                        editButton={{name: 'plus', color: 'green', type: 'font-awesome'}}
                        />
                    <Avatar
                        rounded
                        disabled={false}
                        raised
                        containerStyle={styles.logoContainer}
                        size="large"
                        activeOpacity={0.2}
                        onPress={() => console.log('Pressed')}
                        source={require('../assets/images/starz.png')}
                        showEditButton
                        editButton={{name: 'plus', color: 'green', type: 'font-awesome'}}
                        />
                    <Avatar
                        rounded
                        disabled={false}
                        raised
                        containerStyle={styles.logoContainer}
                        size="large"
                        activeOpacity={0.2}
                        onPress={() => console.log('Pressed')}
                        source={require('../assets/images/tbs.png')}
                        showEditButton
                        editButton={{name: 'plus', color: 'green', type: 'font-awesome'}}
                        />
                    </View>
                    <View style={styles.rowContainer}>
                    <Avatar
                        rounded
                        disabled={false}
                        raised
                        containerStyle={styles.logoContainer}
                        size="large"
                        activeOpacity={0.2}
                        onPress={() => console.log('Pressed')}
                        source={require('../assets/images/tnt.png')}
                        showEditButton
                        editButton={{name: 'plus', color: 'green', type: 'font-awesome'}}
                        />
                    <Avatar
                        rounded
                        disabled={false}
                        raised
                        containerStyle={styles.logoContainer}
                        size="large"
                        activeOpacity={0.2}
                        onPress={() => console.log('Pressed')}
                        source={require('../assets/images/usa.png')}
                        showEditButton
                        editButton={{name: 'plus', color: 'green', type: 'font-awesome'}}
                        />
                    </View>